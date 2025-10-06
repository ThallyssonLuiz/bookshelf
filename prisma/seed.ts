// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  
  const genres = [
    "Literatura Brasileira",
    "Ficção Científica",
    "Realismo Mágico",
    "Ficção",
    "Fantasia",
    "Romance",
    "Biografia",
    "História",
    "Autoajuda",
    "Tecnologia",
    "Programação",
    "Negócios",
    "Psicologia",
    "Filosofia",
    "Poesia",
  ];

  // Criar gêneros
  const createdGenres = [];
  for (const name of genres) {
    const genre = await prisma.genre.upsert({
      where: { name },
      update: {},
      create: { name },
    });
    createdGenres.push(genre);
  }

  console.log("Gêneros inseridos com sucesso!");

  // Criar alguns livros de exemplo se não existirem
  const existingBooks = await prisma.book.count();
  
  if (existingBooks === 0) {
    const ficaoGenre = createdGenres.find(g => g.name === "Ficção");
    const literaturaGenre = createdGenres.find(g => g.name === "Literatura Brasileira");
    
    if (ficaoGenre && literaturaGenre) {
      await Promise.all([
        prisma.book.create({
          data: {
            title: 'Capitães da Areia',
            author: 'Jorge Amado',
            genreId: literaturaGenre.id,
            year_published: 1937,
            year_registration: new Date().getFullYear(),
            pages: 280,
            rating: 4.5,
            synopsis: 'Romance que retrata a vida de meninos de rua em Salvador, Bahia.',
            cover: '/covers/capitaes-areia-jpg.jpg',
            status: 'LIDO'
          }
        }),
        prisma.book.create({
          data: {
            title: 'Dom Casmurro',
            author: 'Machado de Assis',
            genreId: literaturaGenre.id,
            year_published: 1899,
            year_registration: new Date().getFullYear(),
            pages: 256,
            rating: 4.2,
            synopsis: 'Clássico da literatura brasileira que narra a história de Bentinho e Capitu.',
            cover: '/covers/default-cover.png',
            status: 'QUERO_LER'
          }
        }),
        prisma.book.create({
          data: {
            title: 'O Cortiço',
            author: 'Aluísio Azevedo',
            genreId: ficaoGenre.id,
            year_published: 1890,
            year_registration: new Date().getFullYear(),
            pages: 304,
            rating: 4.0,
            synopsis: 'Romance naturalista que retrata a vida em um cortiço no Rio de Janeiro.',
            cover: '/covers/default-cover.png',
            status: 'LENDO'
          }
        })
      ]);
      
      console.log("Livros de exemplo criados com sucesso!");
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
