import { createError } from "../utils/createError.js";
import pool from "../db.js";

export const user = async(req, res , next)=>{
 
        try {
            const result = await pool.query('SELECT id, username FROM users');
            res.status(200).json({ success: true, users: result.rows });
          } catch (error) {
            next(error);
          }
}