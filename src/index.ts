/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { Context, Hono } from 'hono';

const app = new Hono();

async function handleHighSchool(context: Context) {
	const body = await context.req.json();
	const headers = context.req.header()
	return await fetch(
		"https://thisdlstu.schoolis.cn/api/Schedule/ListScheduleByParent",
		{
			method: "POST",
			body: JSON.stringify(body),
			headers: headers,
		}
	);
}

app.post("/high_school", handleHighSchool);
export default app;

