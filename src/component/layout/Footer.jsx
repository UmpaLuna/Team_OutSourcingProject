import React from 'react'
import * as St from '../../styled-component/layout/Footer/StFooter'

function Footer() {
  return (
    <St.FooterContainer>
      <St.FooterContent>
        <St.ContactInfo>
          <St.ContactTitle>고객센터</St.ContactTitle>
          <p>오전 9시 - 9시 운영</p>
          <p>1544-1234</p>
          <p>카카오 문의</p>
        </St.ContactInfo>
        <St.LegalInfo>
          <p>주소 : 서울특별시 강남구 봉은사로 123 11층 | 대표이사 : BO4</p>
          <p>사업자등록번호 : 123-45-6789</p>
        </St.LegalInfo>
        <St.Copyright>
          Copyright GC COMPANY Corp. All rights reserved.
        </St.Copyright>
      </St.FooterContent>
    </St.FooterContainer>
  )
}

export default Footer
