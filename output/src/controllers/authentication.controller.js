"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.refreshToken = exports.register = exports.login = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const roles_1 = require("../enum/roles");
require("dotenv/config");
const prisma = new client_1.PrismaClient();
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    // console.log(req.body);
    if (!username || !password) {
        res.sendStatus(403);
    }
    try {
        const findUser = yield prisma.user.findFirst({
            where: {
                userName: username,
            },
        });
        if (!findUser)
            return res.sendStatus(403);
        const userRoles = yield prisma.userRoles.findMany({
            where: {
                userId: findUser.id,
            },
            select: {
                roleId: true,
            },
        });
        const rolesArray = userRoles.map((role) => role.roleId);
        const pwdCompare = yield bcrypt_1.default.compare(password, findUser.password);
        if (!pwdCompare)
            return res.sendStatus(403);
        const accessToken = jsonwebtoken_1.default.sign({
            info: {
                userName: findUser.userName,
                id: findUser.id,
            },
            roles: rolesArray,
        }, process.env.SECRET_KEY_ACCESS_TOKEN, {
            expiresIn: "30s",
        });
        const refreshToken = jsonwebtoken_1.default.sign({
            sub: {
                userName: findUser.userName,
                id: findUser.id,
            },
        }, process.env.SECRET_KEY_REFRESH_TOKEN, {
            expiresIn: "7d",
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day in ms unit
        });
        yield prisma.user.update({
            where: {
                id: findUser.id,
            },
            data: {
                refreshToken,
            },
        });
        res.status(200).json({ accessToken });
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    /* The code is extracting the `username`, `password`, and `email` from the `req.body` object. It then
  checks if any of these values are falsy (empty or undefined). If any of these values are falsy, it
  sends a 403 Forbidden status code as a response. This is likely used to ensure that all required
  fields are provided in the request body before proceeding with the registration process. */
    const { username, password, email } = req.body;
    console.log(req.body);
    if (!username || !password || !email) {
        res.sendStatus(403);
    }
    try {
        /* The code is checking if there is already a user with the same username in the database. It uses
      the Prisma client to query the `user` table and find all users where the `userName` column matches
      the provided `username`. If there are any matching users, it means that the username is already
      taken, so it sends a 403 Forbidden status code as a response. */
        const duplicateUser = yield prisma.user.findMany({
            where: {
                userName: username,
            },
        });
        if (duplicateUser.length > 0) {
            res.sendStatus(403);
        }
        /* `const pwdHash = await bcrypt.hash(password, 12);` is using the `bcrypt` library to hash the
        `password` using a salt factor of 12. */
        const pwdHash = yield bcrypt_1.default.hash(password, 12);
        /* The code is creating a new user in the database using the Prisma client. It is calling the
      `create` method on the `user` model and passing an object as the argument. This object contains
      the data for the new user, including the `email`, `userName`, and `password` properties. */
        const newUser = yield prisma.user.create({
            data: {
                email: email,
                userName: username,
                password: pwdHash,
                UserRoles: {
                    create: [
                        {
                            roleId: roles_1.Roles.USER,
                        },
                    ],
                },
            },
            select: {
                email: true,
                id: true,
                userName: true,
            },
        });
        res.status(200).json(newUser);
    }
    catch (error) {
        next(error);
    }
});
exports.register = register;
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = req.cookies;
    if (!cookies.refreshToken) {
        return res.sendStatus(403);
    }
    const findUser = yield prisma.user.findFirst({
        where: {
            refreshToken: cookies.refreshToken,
        },
    });
    if (!findUser) {
        return res.sendStatus(403);
    }
    const roles = yield prisma.userRoles.findMany({
        where: {
            userId: findUser === null || findUser === void 0 ? void 0 : findUser.id,
        },
    });
    const rolesArray = roles.map((role) => role.roleId);
    const accessToken = jsonwebtoken_1.default.sign({
        info: {
            userName: findUser === null || findUser === void 0 ? void 0 : findUser.userName,
            id: findUser === null || findUser === void 0 ? void 0 : findUser.id,
        },
        roles: rolesArray,
    }, process.env.SECRET_KEY_ACCESS_TOKEN, {
        expiresIn: "30s",
    });
    res.status(200).json({ accessToken });
});
exports.refreshToken = refreshToken;
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        console.log(user);
        const logout = yield prisma.user.update({
            where: {
                id: user === null || user === void 0 ? void 0 : user.id,
            },
            data: {
                refreshToken: "",
            },
        });
        if (!logout) {
            res.status(403);
        }
        res.clearCookie("refreshToken");
        res.status(200).json({ message: "logout's" });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.logout = logout;
