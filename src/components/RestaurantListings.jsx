"use client";

// This components handles the restaurant listings page
// It receives data from src/app/page.jsx, such as the initial restaurants and search params from the URL

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { React, useState, useEffect } from "react";
import renderStars from "@/src/components/Stars.jsx";
import { getRestaurantsSnapshot } from "@/src/lib/firebase/firestore.js";
import Filters from "@/src/components/Filters.jsx";

const RestaurantItem = ({ restaurant }) => (
  <li key={restaurant.id}>
    <Link href={`/restaurant/${restaurant.id}`}>
      <ActiveResturant restaurant={restaurant} />
    </Link>
  </li>
);

const ActiveResturant = ({ restaurant }) => (
  <div>
    <ImageCover photo={restaurant.photo} name={restaurant.name} />
    <ResturantDetails restaurant={restaurant} />
  </div>
);

const ImageCover = ({ photo, name }) => (
  <div className="image-cover">
    <img src={photo} alt={name} />
  </div>
);

const ResturantDetails = ({ restaurant }) => (
  <div className="restaurant__details">
    <h2>{restaurant.name}</h2>
    <RestaurantRating restaurant={restaurant} />
    <RestaurantMetadata restaurant={restaurant} />
  </div>
);

const RestaurantRating = ({ restaurant }) => (
  <div className="restaurant__rating">
    <ul>{renderStars(restaurant.avgRating)}</ul>
    <span>({restaurant.numRatings})</span>
  </div>
);

const RestaurantMetadata = ({ restaurant }) => (
  <div className="restaurant__meta">
    <p>
      {restaurant.category} | {restaurant.city}
    </p>
    <p>{"$".repeat(restaurant.price)}</p>
  </div>
);

export default function RestaurantListings({ initialRestaurants }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Estado DERIVADO de la URL - siempre sincronizado
  const filters = {
    city: searchParams.get("city") || "",
    category: searchParams.get("category") || "",
    price: searchParams.get("price") || "",
    sort: searchParams.get("sort") || "",
  };

  const handleFilterChange = (newFilters) => {
    const params = new URLSearchParams(searchParams);
    console.log("Nuevos filtros:", newFilters);

    // Actualizar params
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const [restaurants, setRestaurants] = useState(initialRestaurants);

  useEffect(() => {
    return getRestaurantsSnapshot(setRestaurants, filters);
  }, [filters]); // ← Se re-ejecuta automáticamente cuando URL cambia

  return (
    <article>
      <Filters filters={filters} setFilters={handleFilterChange} />
      <ul className="restaurants">
        {restaurants.map((restaurant) => (
          <RestaurantItem key={restaurant.id} restaurant={restaurant} />
        ))}
      </ul>
    </article>
  );
}

function routerWithFilters(router, filters) {
  const queryParams = new URLSearchParams();

  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined && value !== "") {
      queryParams.append(key, value);
    }
  }

  const queryString = queryParams.toString();
  router.push(`?${queryString}`);
}
