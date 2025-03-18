"use client";
import type React from "react";
import SidebarItem from "./ui/sidebarItem";
import {
  ArchiveRestore,
  Ellipsis,
  FileText,
  Home,
  Star,
  Tag,
  Trash,
} from "lucide-react";
import { useNotes } from "@/context/NotesContext";
import { useEffect, useState } from "react";
import { NoteFilter } from "@/types/types";

const Sidebar: React.FC = () => {
  const {
    notes,
    currentFilterType,
    setCurrentFilterType,
    selectedTag,
    setSelectedTag,
  } = useNotes();

  const [showAllTags, setShowAllTags] = useState(false);

  const archivedCount = notes.filter((note) => note.isArchived).length;
  const favoritesCount = notes.filter((note) => note.isFavorite).length;
  const trashCount = notes.filter((note) => note.isDeleted).length;

  const allTags = Array.from(
    new Set(notes.flatMap((note) => note.tags || []))
  ).sort();
  // Display only first 5 tags unless "View More" is clicked
  const displayedTags = showAllTags ? allTags : allTags.slice(0, 5);

  const handleItemClick = (filter: NoteFilter) => {
    setCurrentFilterType(filter);
    setSelectedTag(null);
  };

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
    setCurrentFilterType("all");
  };

  useEffect(() => {
    setCurrentFilterType("all");
  }, [setCurrentFilterType]);

  return (
    <aside id="sidebar" className="md:flex fixed h-full z-10 hidden">
      <div className="bg-[#fbfbfc] dark:bg-[#1e2531] flex flex-col w-full lg:max-w-[16%] md:max-w-[25%] max-w-[25vw] h-full fixed overflow-hidden whitespace-nowrap scrollbar hover:overflow-y-scroll z-10">
        <div className="pt-3">
          <SidebarItem
            Icon={Home}
            name="All Notes"
            isActive={currentFilterType === "all"}
            onClick={() => handleItemClick("all")}
          />
        </div>

        <div className="py-2">
          <h2 className="text-gray-500 dark:text-gray-400 font-semibold text-sm pl-6 my-2">
            Recents
          </h2>
          <SidebarItem
            Icon={FileText}
            name="Recent Note 1"
            isActive={false}
            onClick={() => {}}
          />
          <SidebarItem
            Icon={FileText}
            name="Recent Note 2"
            isActive={false}
            onClick={() => {}}
          />
          <SidebarItem
            Icon={FileText}
            name="Recent Note 3"
            isActive={false}
            onClick={() => {}}
          />
        </div>

        <div className="py-2">
          <h2 className="text-gray-500 dark:text-gray-400 font-semibold text-sm pl-6 my-2">
            Tags
          </h2>
          {displayedTags.length > 0 ? (
            <>
              {displayedTags.map((tag) => (
                <SidebarItem
                  key={tag}
                  Icon={Tag}
                  name={tag}
                  isActive={selectedTag === tag}
                  onClick={() => handleTagClick(tag)}
                />
              ))}
              {allTags.length > 5 && (
                <button
                  onClick={() => setShowAllTags(!showAllTags)}
                  className="flex items-center text-gray-500 dark:text-gray-400 text-sm py-2 px-6 w-full hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Ellipsis className="w-5 h-5" />
                  <span className="ml-2 text-sm">
                    {showAllTags ? "Show Less" : "View More"}
                  </span>
                </button>
              )}
            </>
          ) : (
            <div className="text-gray-400 dark:text-gray-500 text-sm pl-6 py-2">
              No tags found
            </div>
          )}
        </div>

        <div className="py-2">
          <h2 className="text-gray-500 dark:text-gray-400 font-semibold text-sm pl-6 my-2">
            More
          </h2>
          <SidebarItem
            Icon={Star}
            name="Favorites"
            isActive={currentFilterType === "favorites"}
            onClick={() => handleItemClick("favorites")}
            badgeCount={favoritesCount}
          />
          <SidebarItem
            Icon={ArchiveRestore}
            name="Archived Notes"
            isActive={currentFilterType === "archived"}
            onClick={() => handleItemClick("archived")}
            badgeCount={archivedCount}
          />
          <SidebarItem
            Icon={Trash}
            name="Trash"
            isActive={currentFilterType === "trash"}
            onClick={() => handleItemClick("trash")}
            badgeCount={trashCount}
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
