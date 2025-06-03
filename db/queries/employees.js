import db from "#db/client";

/** @returns the employee created according to the provided details */
export async function createEmployee({ name, birthday, salary }) {
  // TODO
  const SQL = `INSERT INTO employees(name, birthday, salary)
  VALUES($1, $2, $3) RETURNING *;`;
  const result = await db.query(SQL, [name, birthday, salary]);
  return result;
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
  console.log(rows[0]);
  return rows[0];
}

/**
 * @returns the updated employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function updateEmployee({ id, name, birthday, salary }) {
  // TODO
  console.log("UPDATING", id, name, birthday, salary);
  const SQL = `UPDATE movies SET name=$1, birthday=$2, salary=$3 WHERE id=$4 RETURNING * `;
  const { rows } = await db.query(SQL, [name, birthday, salary, id]);
  console.log("UPDATING", rows);
  return rows[0];
}

/**
 * @returns the deleted employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function deleteEmployee(id) {
  // TODO
  console.log("DELETE", id);
  const SQL = `DELETE FROM employees WHERE id=$1 `;
  const { rows } = await db.query(SQL, [id]);
  console.log("DELETE", rows);
  return rows[0];
}
