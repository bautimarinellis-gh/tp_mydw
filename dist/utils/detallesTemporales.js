"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeDetalle = exports.getDetallesLength = exports.clearDetalles = exports.getDetalles = exports.addDetalle = void 0;
// Mapa de carritos por usuario: userId -> detalles[]
const carritosPorUsuario = new Map();
const addDetalle = (userId, detalle) => {
    if (!carritosPorUsuario.has(userId)) {
        carritosPorUsuario.set(userId, []);
    }
    carritosPorUsuario.get(userId).push(detalle);
};
exports.addDetalle = addDetalle;
const getDetalles = (userId) => {
    return carritosPorUsuario.get(userId) || [];
};
exports.getDetalles = getDetalles;
const clearDetalles = (userId) => {
    carritosPorUsuario.delete(userId);
};
exports.clearDetalles = clearDetalles;
const getDetallesLength = (userId) => {
    return carritosPorUsuario.get(userId)?.length || 0;
};
exports.getDetallesLength = getDetallesLength;
const removeDetalle = (userId, index) => {
    const detalles = carritosPorUsuario.get(userId);
    if (!detalles || index < 0 || index >= detalles.length) {
        return false;
    }
    detalles.splice(index, 1);
    return true;
};
exports.removeDetalle = removeDetalle;
