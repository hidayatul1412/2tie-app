import frameworkData from "./framework.json";
import { useState } from "react";

export default function FrameworkListSearchFilter() {
  //   const [searchTerm, setSearchTerm] = useState("");
  //   const [selectedTag, setSelectedTag] = useState("");

  /*Inisialisasi DataForm*/
  const [dataForm, setDataForm] = useState({
    searchTerm: "",
    selectedTag: "",
    /*Tambah state lain beserta default value*/
  });

  /*Inisialisasi Handle perubahan nilai input form*/
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const _searchTerm = dataForm.searchTerm.toLowerCase();
  const _selectedTag = dataForm.selectedTag.toString();
  const filteredFrameworks = frameworkData.filter((framework) => {
    const matchesSearch =
      framework.name.toLowerCase().includes(_searchTerm) ||
      framework.description.toLowerCase().includes(_searchTerm);

    const matchesTag = _selectedTag
      ? framework.tags.includes(_selectedTag)
      : true;

    return matchesSearch && matchesTag;
  });

  /** Deklarasi pengambilan unique tags di frameworkData **/
  const allTags = [
    ...new Set(frameworkData.flatMap((framework) => framework.tags)),
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
          Framework Directory
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Cari dan temukan framework terbaik untuk proyek Anda berdasarkan nama,
          deskripsi, atau kategori.
        </p>
      </div>

      {/* Filter & Search Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="relative flex-1">
          <input
            type="text"
            name="searchTerm"
            placeholder="Ketik untuk mencari framework..."
            className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
            onChange={handleChange}
          />
        </div>

        <select
          name="selectedTag"
          className="w-full md:w-64 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white cursor-pointer appearance-none text-gray-700"
          onChange={handleChange}
        >
          <option value="">Semua Kategori</option>
          {allTags.map((tag, index) => (
            <option key={index} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      {/* Framework List Grid */}
      {filteredFrameworks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFrameworks.map((item) => (
            <div
              key={item.id}
              className="flex flex-col bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              {/* Card Header & Desc */}
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {item.name}
                </h2>
                <p className="text-sm text-gray-500 mb-4 flex items-center gap-1">
                  By{" "}
                  <span className="font-semibold text-gray-700">
                    {item.details.developer}
                  </span>
                  <span className="text-gray-400">
                    ({item.details.releaseYear})
                  </span>
                </p>
                <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {item.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Button */}
              <a
                href={item.details.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto block w-full text-center bg-gray-50 hover:bg-blue-600 text-gray-700 hover:text-white font-semibold py-2.5 px-4 rounded-xl transition-colors duration-200"
              >
                Visit Website
              </a>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Framework tidak ditemukan
          </h3>
          <p className="text-gray-500">
            Coba gunakan kata kunci atau pilih kategori tag yang lain.
          </p>
        </div>
      )}
    </div>
  );
}
