import db from "#db/client";

/** @returns the employee created according to the provided details */
export async function createEmployee({ name, birthday, salary }) {
  // TODO
  const SQL = `INSERT INTO employees(name, birthday, salary)
  VALUES($1, $2, $3) RETURNING *;`;
  const { rows } = await db.query(SQL, [name, birthday, salary]);
  return rows[0];
}

// === Part 2 ===

/** @returns all employees */
export async function getEmployees() {
  // TODO
  const SQL = `SELECT * FROM employees`;
  const { rows: employees } = await db.query(SQL);
  return employees;
}

/**
 * @returns the employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function getEmployee(id) {
  // TODO
  const SQL = `SELECT * FROM employees WHERE id=$1`;
  const { rows } = await db.query(SQL, [id]);
  if (rows.length === 0) {
    return undefined;
  }
  return rows[0];
}

/**
 * @returns the updated employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function updateEmployee(id, { name, birthday, salary }) {
  // TODO
  const SQL = `UPDATE employees SET name=$1, birthday=$2, salary=$3 WHERE id=$4 RETURNING * `;
  const { rows } = await db.query(SQL, [name, birthday, salary, id]);
  if (rows.length === 0) {
    return undefined;
  }
  return rows[0];
}

/**
 * @returns the deleted employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function deleteEmployee(id) {
  // TODO
  const SQL = `DELETE FROM employees WHERE id=$1 `;
  const result = await db.query(SQL, [id]);
  return result;
}
