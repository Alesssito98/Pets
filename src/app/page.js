"use client";
import { getPets, addPet } from "./api/pets.js";
import { useState, useEffect } from "react";

export default function Home() {

  const [pets, setPets] = useState([]);
  const [nuevoPet, setNewPetName] = useState("");

  useEffect(() => {

    getPets().then((res) => {

        const uniquePets = res.data.filter((pet, index, self) => index === self.findIndex((p) => p.id === pet.id));
        setPets(uniquePets);

      }).catch(console.error);

  }, []);

  const handleAddPet = async (e) => {

    if (!nuevoPet.trim()) return;

    try {

      const newPet = await addPet({ name: nuevoPet });

      setPets((prevPets) => {

        return [...prevPets, newPet];

      });

      setNewPetName("");

    } catch (error) {
      console.error("Error al agregar la mascota:", error);
    }

  };

  return (
    <div  className="contenido">
      <div>
        <h1>Lista de Mascotas</h1>
        <ul>
          {pets.map((pet) => (
          <li key={pet.id}>{pet.name}</li>
          ))}
        </ul>
      </div>
  
      <div className="formulario">
        <form onSubmit={handleAddPet}>
          <input
            type="text"
            value={nuevoPet}
            onChange={(e) => setNewPetName(e.target.value)}
            placeholder="Nombre de la pet"
          />
          <button type="submit">Agregar Pet</button>
        </form>
      </div>
    </div>
  );
}
