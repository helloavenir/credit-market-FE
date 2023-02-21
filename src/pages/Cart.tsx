import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { getCartList } from '../apis/cart';
import { MESSAGES } from '../constants/messages';
import CartItem from './../components/Cart/CartItem';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../store/loadingSlice';
import COLORS from '@/styles/colors';
import Button from '@/components/common/Button';
import PageTitle from '@/components/common/PageTitle';
import { ICart } from '@/interfaces/cart';
import Input from '@/components/common/Input';
import { useNavigate } from 'react-router-dom';
import ModalBox from '@/components/common/ModalBox';
import { IModal } from '@/interfaces/modal';
import { ROUTES } from '@/constants/routes';

const Cart = () => {
  const dispatch = useDispatch();
  const [cart, setCart] = useState<ICart[]>([]);
  const navigate = useNavigate();
  const [checkId, setCheckId] = useState<string[]>([]);
  const [modalState, setModalState] = useState<IModal>({
    isOpen: false,
    onClickOk: {},
    text: '',
  });

  useEffect(() => {
    async function getData() {
      try {
        dispatch(showLoading());
        // const data = await getCartList();
        // setCart(data);
        const data: ICart[] = [
          { id: '1', title: '직장인 신용대출', bank: '우리은행' },
          { id: '2', title: '주부 신용대출', bank: '국민은행' },
          { id: '3', title: '고양이 신용대출', bank: '신한은행' },
          { id: '4', title: '주부 신용대출', bank: '국민은행' },
          { id: '5', title: '직장인 신용대출', bank: '우리은행' },
          { id: '6', title: '주부 신용대출', bank: '신한은행' },
          { id: '7', title: '고양이 신용대출', bank: '국민은행' },
          { id: '8', title: '대학생 신용대출', bank: '제주은행' },
        ];
        setCart(data);
      } catch (error) {
        alert(MESSAGES.ERROR_CART.GET);
      } finally {
        dispatch(hideLoading());
      }
    }
    getData();
  }, []);

  const handleClick = () => {
    navigate(ROUTES.BUY);
  };

  const handleDelete = () => {
    setModalState({
      isOpen: true,
      onClickOk: handleDeleteCart,
      onClickCancel: () => setModalState((prev) => ({ ...prev, isOpen: false })),
      text: MESSAGES.CHECK_DELETE_CART,
    });
  };

  const handleDeleteCart = () => {
    setModalState({
      isOpen: true,
      onClickOk: () => setModalState((prev) => ({ ...prev, isOpen: false })),
      text: MESSAGES.COMPLETE_DELETE_CART,
    });
  };

  const handleCheck = (checked: HTMLInputElement['checked'], id: string) => {
    if (checked) {
      setCheckId((prev) => [...prev, id]);
    } else {
      setCheckId(checkId.filter((checkedId) => checkedId !== id));
    }
  };

  const handleAllCheck: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.checked) {
      const idArray: Array<string> = [];
      cart.forEach((item) => idArray.push(item.id));
      setCheckId(idArray);
    } else {
      setCheckId([]);
    }
  };

  return (
    <CartContainer>
      <PageTitle title="장바구니" />
      <CheckBoxWrap>
        <AllCheck>
          <Input
            inputType="checkbox"
            classType="checkbox"
            onChange={handleAllCheck}
            checked={checkId.length === cart.length ? true : false}
            id="AllCheck"
          />
          <AllCheckText htmlFor="AllCheck">
            전체선택 ({checkId.length}/{cart.length})
          </AllCheckText>
        </AllCheck>
        <Button buttonType="text" width="fit-content" height="fit-content" onClick={handleDelete}>
          선택삭제
        </Button>
      </CheckBoxWrap>
      <CartContent>
        {Array.isArray(cart) ? (
          cart.map((item) => (
            <CartItem
              key={item.id}
              data={item}
              isCheckBox={true}
              handleCheck={handleCheck}
              checkId={checkId}
            />
          ))
        ) : (
          <div>담으신 상품이 없습니다.</div>
        )}
      </CartContent>
      <Button width="calc(100% - 10px)" onClick={handleClick}>
        신청하기
      </Button>
      <ModalBox
        isOpen={modalState.isOpen}
        onClickOk={modalState.onClickOk}
        onClickCancel={modalState.onClickCancel}
        text={modalState.text}
      />
    </CartContainer>
  );
};

export default Cart;

const CartContainer = styled.div`
  height: 100%;
  padding: 0 0 0 10px;
`;

const CheckBoxWrap = styled.div`
  padding-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 10px;
`;

const AllCheck = styled.div`
  display: flex;
  gap: 6px;
`;

const AllCheckText = styled.label`
  font-size: 14px;
  color: ${COLORS.secondary};
  cursor: pointer;
`;

const CartContent = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 5px;
  height: calc(100% - 185px);
  margin-bottom: 10px;
  overflow-y: auto;
  padding-right: 10px;
`;
