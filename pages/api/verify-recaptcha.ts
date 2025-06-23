import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.body;
  const secret = "6LdZfmYrAAAAAAR-Ob701lL1iNaqVdlaQQ-mTdDv"; // 

  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${secret}&response=${token}`,
  });

  const data = await response.json();

  if (data.success) {
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ success: false });
  }
}
