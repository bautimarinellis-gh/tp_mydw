interface DetalleTemporal {
    producto: string;
    cantidad: number;
    subtotal: number;
} 

// Mapa de carritos por usuario: userId -> detalles[]
const carritosPorUsuario: Map<string, DetalleTemporal[]> = new Map();


export const addDetalle = (userId: string, detalle: DetalleTemporal) => {
    if (!carritosPorUsuario.has(userId)) {
        carritosPorUsuario.set(userId, []);
    }
    carritosPorUsuario.get(userId)!.push(detalle);
};

export const getDetalles = (userId: string) => {
    return carritosPorUsuario.get(userId) || [];
};

export const clearDetalles = (userId: string) => {
    carritosPorUsuario.delete(userId);
};

export const getDetallesLength = (userId: string) => {
    return carritosPorUsuario.get(userId)?.length || 0;
};

export const removeDetalle = (userId: string, index: number) => {
    const detalles = carritosPorUsuario.get(userId);
    if (!detalles || index < 0 || index >= detalles.length) {
        return false;
    }
    detalles.splice(index, 1);
    return true;
};