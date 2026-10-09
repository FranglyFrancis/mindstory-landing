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
        id:1,
        image:allen,
        brand:"Allen Solly"
    },
    {
        id:2,
        image:chai,
        brand:"Chai Peedika"
    },
    {
        id:3,
        image:hyundai,
        brand:"Hyundai"
    },
    {
        id:4,
        image:orgo,
        brand:"Orgo Yolks"
    },
    {
        id:5,
        image:priis,
        brand:"Priis"
    },
    {
        id:6,
        image:royal,
        brand:"Royal Enfield"
    },
    {
        id:7,
        image:lp,
        brand:"Louis Philippe"
    },
    {
        id:8,
        image:orgo,
        brand:"Orgo Yolks"
    },
    {
        id:9,
        image:priis,
        brand:"Priis"
    },
    {
        id:10,
        image:royal,
        brand:"Royal Enfield"
    },
    {
        id:11,
        image:lp,
        brand:"Louis Philippe"
    },
    {
        id:12,
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