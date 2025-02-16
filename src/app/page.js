"use client";
import { getPets } from "./api/pets.js";
import { useState, useEffect } from "react";

export default function Home() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    getPets()
      .then((res) => {
        console.log("Datos recibidos:", res.data);
        setPets(res.data);
      })
      .catch(console.error);
  }, []);

  // Filtrar IDs duplicados
  const uniquePets = pets.reduce((acc, pet) => {
    if (!acc.some((p) => p.id === pet.id)) {
      acc.push(pet);
    }
    return acc;
  }, []);

  return (
    <div>
      <h1>Lista de Mascotas</h1>
      <ul>
        {uniquePets.map((pet) => (
          <li key={pet.id}>{pet.name}</li>
        ))}
      </ul>
    </div>
  );
}
