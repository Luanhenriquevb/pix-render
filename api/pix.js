export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  const { name, cpf, amount } = req.body;

  const headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIyMmUyOTRjOWJiYjUzMjdkZDFjZGU1YjRjNWM2YzUwMCIsInN1YiI6IjliYWU0ZDMzMmM3ZGZiMmZmZWY4OTNkZGQxMmM0ZTNlIiwiaWF0IjoxNzQ5MTM5NDE3LCJleHAiOjE3NDkxNDEyMTd9.oQXtoYzGEo21mNDkC7adTSyPXzCN3afjwUZxtDS43Gk"
  };

  const body = {
    payer: {
      name: name,
      document: cpf
    },
    payment: {
      value: amount
    },
    calendar: {
      expiration: 3600
    },
    txid: "txid-" + Date.now()
  };

  try {
    const response = await fetch("https://api.bspay.co/v2/pix/qrcode", {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ message: "Erro ao gerar QR Code", error: error.message });
  }
}
