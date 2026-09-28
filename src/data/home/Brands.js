import allen from '../../assets/brands/allen.png';
import chai from '../../assets/brands/chaai.jpeg';
import hyundai from '../../assets/brands/hyundai.png';
import orgo from '../../assets/brands/orgo.png';
import priis from '../../assets/brands/priis.png';
import royal from '../../assets/brands/royal.png';
import lp from '../../assets/brands/LP.jpeg';

export const brands = [
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

export function brandArray(array, size) {
  const brands = [];
  for (let i = 0; i < array.length; i += size) {
    brands.push(array.slice(i, i + size));
  }
  return brands;
}