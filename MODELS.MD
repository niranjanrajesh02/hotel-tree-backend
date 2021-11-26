HOTEL {
id: \_id,
name: str,
rooms: [ rel ids of owned available rooms ],
saved: [rel ids of owned products]
reviews: [ rel ids of owned reviews ],
description: str
avg_rating: number,
images: [ str ],
favourited: number,
location: str,
addresss: str,
tags: []
}

ROOM {
id: \_id,
name: str,
hotel: rel id of owner hotel,
price: number,
images: [ str ],
occupants: number,
available: number
breakfast: bool,
view: string,
}

REVIEW {
id: \_id,
user_id: rel id of owner user,
hotel: rel id of owner hotel,
rating: number,
date: date
}

BOOKING {
id: \_id,
user_id: rel id of owner user, <!-- Many to one -->
check_in: date,
check_out: date,
rooms: number,
room_price: number,
total_paid: number
date: date
}

SAVED {
id: \_id,
user_id: rel id of owner user, <!-- One to one -->,
room_id: [rel ids of owned products]
}
