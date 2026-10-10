import type { Order } from '../types';

/**
 * Escapes a cell value for standard CSV compatibility.
 * Handles strings with commas, quotes, line breaks, and numbers.
 */
function escapeCSVCell(value: any): string {
  if (value === null || value === undefined) return '""';
  const str = String(value);
  const escaped = str.replace(/"/g, '""');
  return `"${escaped}"`;
}

/**
 * Formats order items into a single human-readable and spreadsheet-friendly string.
 * Example: "ديور سوفاج (100 مل) × 1 [2500 ج.م] | كريد افينتوس (50 مل) × 2 [3000 ج.م]"
 */
export function formatOrderItemsString(items: Order['items']): string {
  if (!items || items.length === 0) return 'لا توجد أصناف';
  return items
    .map(item => `${item.name} (${item.selectedSize}) × ${item.quantity} [${item.price} ج.م]`)
    .join(' | ');
}

/**
 * Returns Arabic human-readable payment method name
 */
export function getPaymentMethodLabel(method: string): string {
  switch (method) {
    case 'instapay':
      return 'انستاباي (InstaPay)';
    case 'vodafone_cash':
      return 'فودافون كاش (Vodafone Cash)';
    case 'cod':
    default:
      return 'الدفع عند الاستلام (COD)';
  }
}

/**
 * Returns Arabic human-readable order status name
 */
export function getOrderStatusLabel(status: string): string {
  switch (status) {
    case 'new':
      return 'طلب جديد';
    case 'processing':
      return 'قيد التجهيز والتغليف';
    case 'shipped':
      return 'تم الشحن مع المندوب';
    case 'delivered':
      return 'مكتمل ومسلّم للعميل';
    case 'cancelled':
      return 'ملغي';
    default:
      return status;
  }
}

/**
 * Generates CSV content from an array of orders.
 * Includes column headers and treats phone numbers as text strings
 * so Microsoft Excel does not drop leading zeros (e.g. 010...).
 */
export function generateOrdersCSV(orders: Order[]): string {
  const headers = [
    'رقم الطلب',
    'تاريخ الطلب',
    'وقت الطلب',
    'اسم العميل',
    'رقم الهاتف الأساسي',
    'رقم هاتف بديل',
    'المحافظة',
    'العنوان بالتفصيل',
    'الأصناف والكميات المطلوبة',
    'إجمالي عدد القطع',
    'إجمالي المنتجات (ج.م)',
    'مصاريف الشحن (ج.م)',
    'المبلغ الإجمالي النهائي (ج.م)',
    'طريقة الدفع',
    'حالة الطلب',
    'ملاحظات العميل للشحن'
  ];

  const rows = orders.map(order => {
    const orderDate = new Date(order.createdAt);
    const dateStr = !isNaN(orderDate.getTime()) ? orderDate.toLocaleDateString('ar-EG') : order.createdAt;
    const timeStr = !isNaN(orderDate.getTime()) ? orderDate.toLocaleTimeString('ar-EG') : '';
    const totalQty = (order.items || []).reduce((sum, item) => sum + (item.quantity || 1), 0);
    const itemsFormatted = formatOrderItemsString(order.items);

    // Prefix phone numbers with ="01..." so Excel renders them as literal text and keeps the leading zero
    const cleanPhone = (order.phone || '').trim();
    const formattedPhone = cleanPhone ? `="${cleanPhone}"` : '""';
    const cleanAltPhone = (order.alternatePhone || '').trim();
    const formattedAltPhone = cleanAltPhone ? `="${cleanAltPhone}"` : '""';

    return [
      escapeCSVCell(order.id),
      escapeCSVCell(dateStr),
      escapeCSVCell(timeStr),
      escapeCSVCell(order.customerName),
      formattedPhone,
      formattedAltPhone,
      escapeCSVCell(order.governorate),
      escapeCSVCell(order.cityAddress),
      escapeCSVCell(itemsFormatted),
      escapeCSVCell(totalQty),
      escapeCSVCell(order.subtotal),
      escapeCSVCell(order.shippingFee),
      escapeCSVCell(order.total),
      escapeCSVCell(getPaymentMethodLabel(order.paymentMethod)),
      escapeCSVCell(getOrderStatusLabel(order.status)),
      escapeCSVCell(order.notes || '')
    ].join(',');
  });

  return [headers.map(escapeCSVCell).join(','), ...rows].join('\r\n');
}

/**
 * Triggers browser download of a CSV file.
 * Crucially prepends the UTF-8 Byte Order Mark (\uFEFF)
 * so Microsoft Excel on Windows & Mac automatically detects Arabic UTF-8 encoding.
 */
export function downloadOrdersCSV(orders: Order[], filename: string) {
  if (!orders || orders.length === 0) return;
  const csvContent = generateOrdersCSV(orders);
  // \uFEFF is the UTF-8 BOM
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  const safeFilename = filename.endsWith('.csv') ? filename : `${filename}.csv`;
  link.setAttribute('download', safeFilename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Copies formatted orders table to clipboard in TSV format
 * for instant Ctrl+V into Microsoft Excel or Google Sheets.
 */
export async function copyOrdersToClipboard(orders: Order[]): Promise<boolean> {
  if (!orders || orders.length === 0) return false;

  const headers = [
    'رقم الطلب',
    'تاريخ الطلب',
    'اسم العميل',
    'رقم الهاتف',
    'المحافظة',
    'العنوان بالتفصيل',
    'الأصناف والكميات',
    'إجمالي المنتجات',
    'الشحن',
    'الإجمالي المطلوب تحصيله',
    'طريقة الدفع',
    'حالة الطلب',
    'ملاحظات'
  ];

  const rows = orders.map(order => {
    const orderDate = new Date(order.createdAt);
    const dateFormatted = !isNaN(orderDate.getTime()) ? orderDate.toLocaleString('ar-EG') : order.createdAt;
    const itemsFormatted = formatOrderItemsString(order.items);
    return [
      order.id,
      dateFormatted,
      order.customerName,
      order.phone,
      order.governorate,
      order.cityAddress.replace(/[\r\n\t]/g, ' '),
      itemsFormatted,
      `${order.subtotal} ج.م`,
      `${order.shippingFee} ج.م`,
      `${order.total} ج.م`,
      getPaymentMethodLabel(order.paymentMethod),
      getOrderStatusLabel(order.status),
      (order.notes || '').replace(/[\r\n\t]/g, ' ')
    ].join('\t');
  });

  const tsv = [headers.join('\t'), ...rows].join('\n');
  try {
    await navigator.clipboard.writeText(tsv);
    return true;
  } catch (err) {
    console.error('Failed to copy orders to clipboard', err);
    return false;
  }
}

/**
 * Copies a single order's dispatch snippet for courier delivery (Bosta, Mylerz, Aramex, etc.)
 */
export async function copyCourierSnippet(order: Order): Promise<boolean> {
  const itemsText = (order.items || [])
    .map(i => `${i.name} (${i.selectedSize}) عدد ${i.quantity}`)
    .join(' + ');

  const text = `📦 أوردر شحن متجر ORO PURO
رقم الطلب: ${order.id}
العميل: ${order.customerName}
الهاتف: ${order.phone}${order.alternatePhone ? ` / ${order.alternatePhone}` : ''}
المحافظة: ${order.governorate}
العنوان: ${order.cityAddress}
المنتجات: ${itemsText}
المبلغ المطلوب تحصيله (COD): ${order.paymentMethod === 'cod' ? `${order.total} ج.م` : 'مدفوع مسبقاً (0 ج.م)'}
طريقة الدفع: ${getPaymentMethodLabel(order.paymentMethod)}
${order.notes ? `ملاحظات: ${order.notes}` : ''}`;

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
