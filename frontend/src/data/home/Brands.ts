import allen from '/images/brands/allen.png';
import chai from '/images/brands/chaai.jpeg';
import hyundai from '/images/brands/hyundai.png';
import orgo from '/images/brands/orgo.png';
import priis from '/images/brands/priis.png';
import royal from '/images/brands/royal.png';
import lp from '/images/brands/LP.jpeg';
import { Brand } from '../../types';

export const details = {
    title: "Trusted Brands",
    description: "Our commitment to excellence has made us a preferred digital marketing agency for leading brands. We prioritize client satisfaction and deliver custom solutions tailored to your unique needs and aspirations."
}
export const brands: Brand[] = [
    {
        image:allen,
        brand:"Allen Solly"
    },
    {
        image:chai,
        brand:"Chai Peedika"
    },
    {
        image:hyundai,
        brand:"Hyundai"
    },
    {
        image:orgo,
        brand:"Orgo Yolks"
    },
    {
        image:priis,
        brand:"Priis"
    },
    {
        image:royal,
        brand:"Royal Enfield"
    },
    {
        image:lp,
        brand:"Louis Philippe"
    },
    {
        image:orgo,
        brand:"Orgo Yolks"
    },
    {
        image:priis,
        brand:"Priis"
    },
    {
        image:royal,
        brand:"Royal Enfield"
    },
    {
        image:lp,
        brand:"Louis Philippe"
    },
    {
        image:chai,
        brand:"Chai Peedika"
    }
]

export function brandArray<T>(array: T[], size: number): T[][] {
  const brands: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    brands.push(array.slice(i, i + size));
  }
  return brands;
}