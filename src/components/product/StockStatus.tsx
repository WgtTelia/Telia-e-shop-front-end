import React from 'react'

interface StockStatusProps {
  stockAmount: number
}

export const StockStatus: React.FC<StockStatusProps> = ({ stockAmount }) => {
  const getStockStyles = (stockAmount: number) => {
    if (stockAmount === 0) {
      return {
        backgroundColor: '#980233',
        outlineColor: '#FFDDE8',
        textColor: '#980233',
        text: 'Not in stock',
      }
    } else if (stockAmount <= 10) {
      return {
        backgroundColor: '#FFA500',
        outlineColor: '#FFF2CC',
        textColor: '#FFA500',
        text: 'Low stock',
      }
    } else {
      return {
        backgroundColor: '#02562B',
        outlineColor: '#C5EFD9',
        textColor: '#02562B',
        text: 'In stock',
      }
    }
  }

  const stockStyles = getStockStyles(stockAmount)

  return (
    <div className='flex items-center justify-center gap-2 py-2'>
      <div
        className='size-[8px] rounded-full outline outline-2'
        style={{
          backgroundColor: stockStyles.backgroundColor,
          outlineColor: stockStyles.outlineColor,
        }}
      ></div>
      <p style={{ color: stockStyles.textColor }}>{stockStyles.text}</p>
    </div>
  )
}
