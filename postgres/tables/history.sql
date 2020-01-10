begin transaction;

create table history (
    img_url text not null,
    bounding_boxes json not null,
    created_at timestamp default current_timestamp not null,
    user_id integer references users (id)
);

commit;