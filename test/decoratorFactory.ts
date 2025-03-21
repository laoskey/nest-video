import axios from 'axios';

const get = (url: string) => {
  return (target: any, key: any, description: PropertyDescriptor) => {
    // Use a more specific type for func to avoid the "Unsafe assignment of an `any` value" error
    const func = description.value as (
      data: any,
      responseInfo: { status: number; success: boolean },
    ) => void;

    axios
      .get(url)
      .then((res) => {
        // Cast func to a more specific type to avoid the "Unsafe call of a(n) `any` typed value" error
        func(res, {
          status: 200,
          success: true,
        });
      })
      .catch((err) => {
        // Cast func to a more specific type to avoid the "Unsafe call of a(n) `any` typed value" error
        func(err, {
          status: 500,
          success: false,
        });
      });
  };
};

class Controller {
  constructor() {}

  @get('https://api.apiopen.top/api/getThaoKanVideo?page=0&size=10')
  getList(res: any, responseInfo: { status: number; success: boolean }) {
    console.log(res.data, responseInfo);
  }
}
