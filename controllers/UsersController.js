import dbClient from '../utils/db';
import redisClient from '../utils/redis';


class UsersController {
static async postNew(req, res){
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Missing email' });
    }

    if (!password) {
        return res.status(400).json({ error: 'Missing password' });
    }

    try {
        const existingUser = await User.findOne({ email });
    
        if (existingUser) {
          return res.status(400).json({ error: 'Already exist' });
        }
        const hashedPassword = sha1(password);
      
        // Create new user
        const result = await dbClient.db.collection('users').insertOne({
          email,
          password: hashedPassword,
        });
  
        // Return the new user with email and id
        return res.status(201).json({
          id: result.insertedId,
          email,
        });
      } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
    }
  }
