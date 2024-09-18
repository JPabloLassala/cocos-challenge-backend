// select
// 	u.id,
// 	u.email,
// 	u.accountnumber,
// 	sum(case when o.side in ('SELL', 'CASH_OUT') then (o.size * o.price * -1) else o.price * o.size END) as total,
// 	i.ticker,
// 	i."name"
// from
// 	users u
// left join orders o on
// 	o.userid = u.id
// left join instruments i on
// 	i.id = o.instrumentid
// where
// 	u.id = 1
// 	and o.status = 'FILLED'
// group by u.id, i.id
