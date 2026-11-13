const lookup = document.querySelector('#lookup');
const records = document.querySelector('#records');
const message = document.querySelector('#message');
const disciplineForm = document.querySelector('#discipline');
const billForm = document.querySelector('#bill');
let selectedCardId = '';

async function request(payload) {
  const token = lookup.elements.token.value;
  const response = await fetch('/api/student-records', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(payload) });
  const result = await response.json();
  if (!response.ok) throw new Error(result.message || 'Não foi possível concluir a operação.');
  return result;
}
function renderList(container, rows, describe, edit) {
  container.replaceChildren();
  if (!rows.length) { const p = document.createElement('p'); p.className = 'hint'; p.textContent = 'Nenhum registro cadastrado.'; container.append(p); return; }
  for (const row of rows) {
    const item = document.createElement('div'); item.className = 'row';
    const description = document.createElement('p'); description.textContent = describe(row);
    const button = document.createElement('button'); button.type = 'button'; button.className = 'secondary'; button.textContent = 'Editar'; button.addEventListener('click', () => edit(row));
    item.append(description, button); container.append(item);
  }
}
async function refresh() {
  const result = await request({ action: 'consultar', cardId: selectedCardId });
  document.querySelector('#student').textContent = `${result.card.nome} — ${result.card.curso}`;
  renderList(document.querySelector('#disciplines'), result.disciplines, row => `${row.name} · Nota: ${row.grade ?? '—'}/${row.grade_max ?? '—'} · Faltas: ${row.absences ?? '—'}/${row.absence_limit ?? '—'}`, row => {
    for (const [field, value] of Object.entries({ id: row.id, name: row.name, code: row.code, grade: row.grade, gradeMax: row.grade_max, absences: row.absences, absenceLimit: row.absence_limit })) disciplineForm.elements[field].value = value ?? '';
    disciplineForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
  renderList(document.querySelector('#bills'), result.bills, row => `${row.description} · ${row.due_date} · R$ ${(row.amount_cents / 100).toFixed(2)} · ${row.status}`, row => {
    for (const [field, value] of Object.entries({ id: row.id, description: row.description, dueDate: row.due_date, amount: (row.amount_cents / 100).toFixed(2), status: row.status, paymentUrl: row.payment_url })) billForm.elements[field].value = value ?? '';
    billForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
  records.hidden = false;
}
lookup.addEventListener('submit', async event => {
  event.preventDefault(); records.hidden = true; selectedCardId = lookup.elements.cardId.value.trim(); message.textContent = 'Consultando…';
  try { await refresh(); message.textContent = 'Aluno encontrado.'; } catch (error) { message.textContent = error.message; }
});
for (const [form, action] of [[disciplineForm, 'disciplina'], [billForm, 'boleto']]) {
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    if (action === 'boleto') { data.amountCents = Math.round(Number(data.amount) * 100); delete data.amount; }
    try { const result = await request({ ...data, action, cardId: selectedCardId }); form.reset(); await refresh(); message.textContent = result.message; message.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
    catch (error) { message.textContent = error.message; message.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
  });
}
