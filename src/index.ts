import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { User } from './entities/User';
import {
  uniqueNamesGenerator,
  adjectives,
  animals,
  colors,
} from 'unique-names-generator';

async function main() {
  const connection = await createConnection();
  const userRepository = connection.getRepository(User);

  const users = await userRepository.find();
  if (users.length === 0) {
    const newUser = new User();
    newUser.username = 'ryan_s';
    newUser.email = 'ryan@example.com';

    try {
      await userRepository.save(newUser);
      console.log('Saved user:', newUser);
    } catch (error) {
      console.error('Error saving user:', error);
    }

    console.log('Inserting 1000 fake users...');

    for (let i = 0; i < 1000; i++) {
      const newUser = new User();
      newUser.username = uniqueNamesGenerator({
        dictionaries: [adjectives, colors, animals],
        style: 'lowerCase',
        separator: '_',
        length: 2,
      });
      newUser.email = `${newUser.username}@example.com`;

      try {
        await userRepository.save(newUser);
        console.log(`Saved user: ${newUser.username}`);
      } catch (error) {
        console.error('Error saving user:', error);
      }
    }

    console.log('Inserted 1000 fake users.');
  } else {
    console.log('Users already exist. Skipping insertion.');
  }

  const userSearch = await userRepository.findOne({ where: { id: 777 } });
  console.log('User ID 777:', userSearch);

  const ryan = await userRepository.findOne({ where: { username: 'ryan_s' } });
  console.log('Ryan:', ryan);
}

main().catch((error) => console.error('Main Error:', error));
