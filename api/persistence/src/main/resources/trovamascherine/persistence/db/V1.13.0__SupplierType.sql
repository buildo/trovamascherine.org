create type supplier_type as enum('Pharmacy', 'Parapharmacy');
create cast (varchar as supplier_type) with inout as assignment;

alter table supplier
add column type supplier_type not null default 'Pharmacy';

alter table supplier
alter column type drop default;
