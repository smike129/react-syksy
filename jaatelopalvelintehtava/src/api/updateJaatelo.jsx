export async function updateJaatelo(apiUrl, id, tuote) {
  const response = await fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tuote),
  });
  if (!response.ok) {
    throw new Error("Update failed");
  }
  return response.json().catch(() => null);
}
