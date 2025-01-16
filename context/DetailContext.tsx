import React, { createContext, useContext, useState, ReactNode } from "react";

export interface ViewData {
  name?: string;
  image?: { medium?: string; original?: string };
  summary?: string;
  rating?: {
    average?: number;
  };
  type?:string;
  status?:string;
  premiered?:string;
}

interface DetailContextProps {
  viewData: ViewData;
  setViewData: (data: ViewData) => void;
}

// Create the context
const DetailContext = createContext<DetailContextProps | undefined>(undefined);

// Context provider
export const DetailProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [viewData, setViewData] = useState<ViewData>({});

  return (
    <DetailContext.Provider value={{ viewData, setViewData }}>
      {children}
    </DetailContext.Provider>
  );
};

// Custom hook for consuming the context
export const useDetailContext = (): DetailContextProps => {
  const context = useContext(DetailContext);
  if (!context) {
    throw new Error("useDetailContext must be used within a DetailProvider");
  }
  return context;
};
