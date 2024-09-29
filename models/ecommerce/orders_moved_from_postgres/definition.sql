-- select * from postgres.public.orders;
select
    1 as amount,
    'apples' as product_id
union all
select
    2 as amount,
    'bananas' as product_id
