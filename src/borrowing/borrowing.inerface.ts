export interface Borrowing {
    id: number;//رقم عملية الاستعاره
    bookId: number;//رقم الكتاب المستعار
    userId: number;//رقم المستخدم الذي استعاره
    isReturned: boolean;//هل تم إرجاع الكتاب أم لا
}