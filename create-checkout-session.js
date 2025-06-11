const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

/**
 * @param {import('vercel').VercelRequest} req
 * @param {import('vercel').VercelResponse} res
 */
module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed");
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: '3D NFT Car Minting',
          },
          unit_amount: 9900, // $99 in cents
        },
        quantity: 1,
      }],
      success_url: 'https://dr1v310-cesarinos-projects.vercel.app/success',
      cancel_url: 'https://dr1v310-cesarinos-projects.vercel.app/cancel',
    });

    res.status(200).json({ id: session.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
