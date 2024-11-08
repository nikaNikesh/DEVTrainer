import React, {createContext, ReactNode, useState} from "react";

export interface BurgerMenuType {
    hiddenBurgerMenu: boolean;
    handleBurgerMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BurgerMenuContext = createContext<BurgerMenuType | undefined>(undefined);

export const BurgerMenuProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [hiddenBurgerMenu, setHiddenBurgerMenu] = useState<boolean>(true);

    const value: BurgerMenuType = {hiddenBurgerMenu: hiddenBurgerMenu, handleBurgerMenu: setHiddenBurgerMenu};

    return (
        <BurgerMenuContext.Provider value={value}>
            {children}
        </BurgerMenuContext.Provider>
    );
}

