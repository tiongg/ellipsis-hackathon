import axios from 'axios';

type Point = { longitude: number; latitude: number };

type ResultDto = {
  found: number;
  totalNumPages: number;
  pageNum: number;
  results: {
    //Full address
    SEARCHVAL: string;
    //idk xy
    X: string;
    Y: string;
    //what we want
    LATITUDE: string;
    LONGITUDE: string;
  }[];
};

/**
 * Convert an SG postal code to a longitude and latitude
 */
export async function postalCodeToLongLat(postalCode: string): Promise<Point> {
  const res = await axios.get<ResultDto>(
    'https://www.onemap.gov.sg/api/common/elastic/search',
    {
      params: {
        searchVal: postalCode,
        returnGeom: 'Y',
        getAddrDetails: 'N',
      },
    }
  );
  console.log(res);
  if (res.data.found === 0) {
    throw new Error('Postal code not found');
  }
  const result = res.data.results[0];
  return {
    longitude: parseFloat(result.LONGITUDE),
    latitude: parseFloat(result.LATITUDE),
  };
}
