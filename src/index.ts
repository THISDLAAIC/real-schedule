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
	let response = await fetch(
		"https://thisdlstu.schoolis.cn/api/Schedule/ListScheduleByParent",
		{
			method: "POST",
			body: JSON.stringify(body),
			headers: headers,
		}
	);
	const resp_body: any = await response.json();
	resp_body.data.forEach((schedule: any) => {
		if (!schedule.beginTime.endsWith("T11:30:00") || !schedule.endTime.endsWith("T12:10:00")) return;
		schedule.beginTime = schedule.beginTime.replace("T11:30:00", "T12:10:00");
		schedule.endTime = schedule.endTime.replace("T12:10:00", "T12:50:00");
	})
	return new Response(JSON.stringify(resp_body), {
		headers: { "Content-Type": "application/json" }
	});
}

app.post("/high_school", handleHighSchool);
export default app;

