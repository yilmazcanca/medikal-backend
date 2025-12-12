"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
exports.default = ({ env }) => {
    // Render'da 'DATABASE_CLIENT' değişkenini 'postgres' yapacağız.
    const client = env('DATABASE_CLIENT', 'sqlite');
    if (client === 'postgres') {
        return {
            connection: {
                client: 'postgres',
                connection: {
                    connectionString: env('DATABASE_URL'), // Render'ın verdiği adres
                    ssl: env.bool('DATABASE_SSL', false) ? { rejectUnauthorized: false } : false, // Güvenlik ayarı
                },
                pool: {
                    min: env.int('DATABASE_POOL_MIN', 2),
                    max: env.int('DATABASE_POOL_MAX', 10),
                },
            },
        };
    }
    // Bilgisayarında (Localhost) çalışırken burası çalışır (SQLite)
    return {
        connection: {
            client: 'sqlite',
            connection: {
                filename: path_1.default.join(__dirname, '..', '..', '.tmp/data.db'),
            },
            useNullAsDefault: true,
        },
    };
};
