import type { Handler, HandlerEvent } from "@netlify/functions"

export const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) }
  }

  const secretKey = process.env["STRIPE_SECRET_KEY"]
  if (!secretKey) {
    return { statusCode: 500, body: JSON.stringify({ error: "STRIPE_SECRET_KEY is not configured." }) }
  }

  let body: unknown
  try {
    body = JSON.parse(event.body ?? "{}")
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid JSON body." }) }
  }

  const { items } = body as { items?: unknown }

  if (!Array.isArray(items) || items.length === 0) {
    return { statusCode: 400, body: JSON.stringify({ error: "items must be a non-empty array." }) }
  }

  for (const item of items) {
    if (
      typeof item !== "object" ||
      item === null ||
      typeof (item as Record<string, unknown>)["priceId"] !== "string" ||
      ((item as Record<string, unknown>)["priceId"] as string).trim().length === 0
    ) {
      return { statusCode: 400, body: JSON.stringify({ error: "Each item must have a non-empty string priceId." }) }
    }
    const qty = (item as Record<string, unknown>)["quantity"]
    if (qty !== undefined && (!Number.isInteger(qty) || (qty as number) < 1)) {
      return { statusCode: 400, body: JSON.stringify({ error: "Each item quantity must be a positive integer." }) }
    }
  }

  const validItems = items as Array<{ priceId: string; quantity?: number }>

  const origin =
    event.headers["origin"] ??
    (event.headers["host"] ? `https://${event.headers["host"]}` : "https://amanirootsoils.com")

  const params = new URLSearchParams()
  params.append("mode", "payment")
  params.append("success_url", `${origin}/shop?checkout=success`)
  params.append("cancel_url", `${origin}/shop?checkout=cancel`)
  params.append("shipping_address_collection[allowed_countries][0]", "US")
  params.append("shipping_options[0][shipping_rate]", "shr_1TFGmCE8MLgkmP6cq8iJ1OTp")

  validItems.forEach((item, i) => {
    params.append(`line_items[${i}][price]`, item.priceId)
    params.append(`line_items[${i}][quantity]`, String(item.quantity ?? 1))
  })

  try {
    const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    })

    const data = (await res.json()) as Record<string, unknown>

    if (!res.ok) {
      const stripeErr = data["error"] as Record<string, unknown> | undefined
      const message = typeof stripeErr?.["message"] === "string"
        ? stripeErr["message"]
        : "Stripe returned an error."
      return { statusCode: 500, body: JSON.stringify({ error: message }) }
    }

    if (typeof data["url"] !== "string") {
      return { statusCode: 500, body: JSON.stringify({ error: "Stripe did not return a checkout URL. Please retry." }) }
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: data["url"] }),
    }
  } catch (err: unknown) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err instanceof Error ? err.message : "Checkout failed. Please try again.",
      }),
    }
  }
}
