export async function createJaatelo(apiUrl, tuote) {
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tuote),
  });
  if (!response.ok) {
    throw new Error("Create failed");
  }
  return response.json().catch(() => null);
}
