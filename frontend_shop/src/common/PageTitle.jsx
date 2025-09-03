import React from 'react'

const PageTitle = ({title='페이지 제목'}) => {
  return (
    <p style={{
        'fontSize': '1.2rem',
        'fontWeight': 'bold',
        'fontStyle': 'italic',
        'borderBottom': '1.5px solid #dddddd',
        'width': '200px',
        'paddingBottom': '2px',
        'marginBottom': '16px'
    }}>
      {title}
    </p>
  )
}



export default PageTitle