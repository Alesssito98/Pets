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
      const newPet = await addPet({
        id: Date.now(), // Genera un ID temporal (la API puede sobreescribirlo)
        name: nuevoPet,
        status: "available",
        photoUrls: [],
        category: { id: 1, name: "General" },
        tags: [],
      });
  
      console.log("Nueva mascota agregada:", newPet.data);
      setPets((prevPets) => [newPet.data, ...prevPets]);
      setNewPetName("");
    } catch (error) {
      console.error("Error al agregar la mascota:", error);
    }

  };

  return (
    <div  className="contenido">
      <div className="lista">
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
