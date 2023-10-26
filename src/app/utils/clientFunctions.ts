export const fetchData = async <T>(url: string): Promise<T> => {
  console.log("fetchData");
  const res = await fetch(url, {
    cache: "no-cache",
    headers: { "x-api-key": process.env.NEXT_PUBLIC_APP_API_KEY! },
  });

  const { data } = await res.json();
  return data;
};

export const postData = async <T>({ url, data }: { url: string; data: any }): Promise<T> => {
  console.log("postData");
  const res = await fetch(url, {
    method: "POST",
    cache: "no-cache",
    headers: { "x-api-key": process.env.NEXT_PUBLIC_APP_API_KEY! },
    body: JSON.stringify(data),
  });
  const { data: res_data } = await res.json();
  return res_data;
};

export const putData = async <T>({ url, data }: { url: string; data: any }): Promise<T> => {
  console.log("putData");
  const res = await fetch(url, {
    method: "PUT",
    cache: "no-cache",
    headers: { "x-api-key": process.env.NEXT_PUBLIC_APP_API_KEY! },
    body: JSON.stringify(data),
  });
  const { data: res_data } = await res.json();
  return res_data;
};

export const deleteData = async <T>({ url }: { url: string }): Promise<T> => {
  console.log("deleteData");
  const res = await fetch(url, {
    method: "DELETE",
    cache: "no-cache",
    headers: { "x-api-key": process.env.NEXT_PUBLIC_APP_API_KEY! },
  });
  const { message } = await res.json();
  return message;
};
