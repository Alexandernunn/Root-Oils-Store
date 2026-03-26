import { Router, type IRouter, type Request, type Response } from "express";
import Stripe from "stripe";

const router: IRouter = Router();

router.post("/checkout", async (req: Request, res: Response) => {
  const secretKey = process.env["STRIPE_SECRET_KEY"];
  if (!secretKey) {
    res
      .status(500)
      .json({ error: "STRIPE_SECRET_KEY environment variable is not set." });
    return;
  }

  const { items } = req.body as {
    items?: unknown;
  };

  if (!Array.isArray(items) || items.length === 0) {
    res.status(400).json({ error: "items must be a non-empty array." });
    return;
  }

  for (const item of items) {
    if (
      typeof item !== "object" ||
      item === null ||
      typeof (item as Record<string, unknown>)["priceId"] !== "string" ||
      ((item as Record<string, unknown>)["priceId"] as string).trim().length ===
        0
    ) {
      res
        .status(400)
        .json({ error: "Each item must have a non-empty string priceId." });
      return;
    }
    const qty = (item as Record<string, unknown>)["quantity"];
    if (qty !== undefined && (!Number.isInteger(qty) || (qty as number) < 1)) {
      res
        .status(400)
        .json({ error: "Each item quantity must be a positive integer." });
      return;
    }
  }

  const validItems = items as Array<{ priceId: string; quantity?: number }>;

  const origin =
    (process.env["REPLIT_DOMAINS"]
      ? `https://${process.env["REPLIT_DOMAINS"].split(",")[0]}`
      : null) ??
    req.headers.origin ??
    `${req.protocol}://${req.headers.host}`;

  const successUrl = `${origin}/shop?checkout=success`;
  const cancelUrl = `${origin}/shop?checkout=cancel`;

  const stripe = new Stripe(secretKey);

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: validItems.map((item) => ({
      price: item.priceId,
      quantity: item.quantity ?? 1,
    })),
    success_url: successUrl,
    cancel_url: cancelUrl,
  });

  if (!session.url) {
    res
      .status(500)
      .json({ error: "Stripe did not return a checkout URL. Please retry." });
    return;
  }

  res.json({ url: session.url });
});

export default router;
