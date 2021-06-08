import React from 'react'
import ScrollButton from 'react-scroll-button'

const ScrollComponent = () => {
  return (
    <ScrollButton 
      behavior={'smooth'} 
      buttonBackgroundColor={'#03B9B0'}
      iconType={'arrow-up'}
      style= {{ fontSize: '24px', zIndex: '99999'}}
      targetId='language'
    />
  )
}

export default ScrollComponent
