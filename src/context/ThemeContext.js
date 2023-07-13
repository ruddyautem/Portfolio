"use client"

import { createContext, useState } from 'react'

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
    const [mode, setMode] = useState('ayu')
    
    const toggle = (color) => {
        setMode(color)
    }

    return (
        
    <ThemeContext.Provider value={{toggle, mode}}>
        <div className={`theme ${mode}`}>
        {children}
        </div>
    </ThemeContext.Provider>
    )
}