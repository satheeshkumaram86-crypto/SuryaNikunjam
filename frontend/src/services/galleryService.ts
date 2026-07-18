import api from "./api";

// Get all gallery media
export const getGallery = async () => {
  const res = await api.get("/gallery");
  return res.data;
};

// Get single gallery media
export const getGalleryById = async (id: string) => {
  const res = await api.get(`/gallery/${id}`);
  return res.data;
};

// Create gallery media
export const createGallery = async (formData: FormData) => {
  try {
    const res = await api.post("/gallery", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

// Update gallery media
export const updateGallery = async (
  id: string,
  formData: FormData
) => {
  try {
    const res = await api.put(
      `/gallery/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

// Delete gallery media
export const deleteGallery = async (id: string) => {
  const res = await api.delete(`/gallery/${id}`);
  return res.data;
};

// Toggle Active / Inactive
export const toggleGalleryStatus = async (
  id: string
) => {
  const res = await api.patch(
    `/gallery/${id}/toggle`
  );

  return res.data;
};