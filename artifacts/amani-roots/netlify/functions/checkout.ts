import type { Handler, HandlerEvent } from "@netlify/functions"
import Stripe from "stripe"

export const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    }
  }

  const secretKey = process.env["STRIPE_SECRET_KEY"]
  if (!secretKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "STRIPE_SECRET_KEY is not configured." }),
    }
  }

  let body: unknown
  try {
    body = JSON.parse(event.body ?? "{}")
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid JSON body." }),
    }
  }

  const { items } = body as { items?: unknown }

  if (!Array.isArray(items) || items.length === 0) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "items must be a non-empty array." }),
    }
  }

  for (const item of items) {
    if (
      typeof item !== "object" ||
      item === null ||
      typeof (item as Record<string, unknown>)["priceId"] !== "string" ||
      ((item as Record<string, unknown>)["priceId"] as string).trim().length === 0
    ) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Each item must have a non-empty string priceId." }),
      }
    }
    const qty = (item as Record<string, unknown>)["quantity"]
    if (qty !== undefined && (!Number.isInteger(qty) || (qty as number) < 1)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Each item quantity must be a positive integer." }),
      }
    }
  }

  const validItems = items as Array<{ priceId: string; quantity?: number }>

  const origin =
    event.headers["origin"] ??
    (event.headers["host"] ? `https://${event.headers["host"]}` : "https://amanirootsoils.com")

  const successUrl = `${origin}/shop?checkout=success`
  const cancelUrl = `${origin}/shop?checkout=cancel`

  try {
    const stripe = new Stripe(secretKey)
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: validItems.map((item) => ({
        price: item.priceId,
        quantity: item.quantity ?? 1,
      })),
      shipping_options: [
        { shipping_rate: "shr_1TFGmCE8MLgkmP6cq8iJ1OTp" },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
    })

    if (!session.url) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Stripe did not return a checkout URL. Please retry." }),
      }
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: session.url }),
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
