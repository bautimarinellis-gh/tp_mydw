"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDto = void 0;
const class_validator_1 = require("class-validator");
const userSchema_1 = __importDefault(require("../models/userSchema"));
let isEmailUnique = class isEmailUnique {
    constructor() {
        this.defaultMessage = () => "El correo ya está en uso";
    }
    async validate(email) {
        const user = await userSchema_1.default.findOne({ email });
        return !user;
    }
};
isEmailUnique = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: true })
], isEmailUnique);
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, class_validator_1.IsString)({ message: "El nombre debe ser un texto" }),
    (0, class_validator_1.MinLength)(3, { message: "El nombre debe tener al menos 3 caracteres" }),
    (0, class_validator_1.MaxLength)(10, { message: "El nombre debe tener como máximo 10 caracteres" }),
    (0, class_validator_1.IsNotEmpty)({ message: "El nombre es obligatorio" }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "El apellido debe ser un texto" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: "El correo no tiene un formato válido" }),
    (0, class_validator_1.IsNotEmpty)({ message: "El correo es obligatorio" }),
    (0, class_validator_1.Validate)(isEmailUnique),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsInt)({ message: "La edad debe ser un número entero" }),
    (0, class_validator_1.Min)(1, { message: "La edad no puede ser menor a uno" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateUserDto.prototype, "age", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "La contraseña debe ser un texto" }),
    (0, class_validator_1.MinLength)(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
    (0, class_validator_1.IsNotEmpty)({ message: "La contraseña es obligatoria" }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
