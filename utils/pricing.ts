
import { ImageQuality } from "../types";

export const PRICING = {
    AUTO: 0.2,
    STANDARD: 0.3,
    Q2K: 0.8,
    Q4K: 1.4,
    EDIT: 0.8
};

interface CostParams {
    quality: ImageQuality;
    imageCount: number;
    isEdit?: boolean;
}

export const calculateGenerationCost = (params: CostParams): number => {
    if (params.isEdit) {
        // Edit mode is fixed per generation
        return PRICING.EDIT * (params.imageCount || 1);
    }

    let unitCost = PRICING.STANDARD;

    switch (params.quality) {
        case ImageQuality.Q2K:
            unitCost = PRICING.Q2K;
            break;
        case ImageQuality.Q4K:
            unitCost = PRICING.Q4K;
            break;
        case ImageQuality.AUTO:
            unitCost = PRICING.AUTO;
            break;
        case ImageQuality.STANDARD:
        default:
            unitCost = PRICING.STANDARD;
            break;
    }

    // Return float with 2 decimal precision
    const total = unitCost * (params.imageCount || 1);
    return Number(total.toFixed(2));
};
