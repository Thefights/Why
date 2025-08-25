import { useMemo } from "react";

type ErrMap<TKeys extends PropertyKey> = Partial<
  Record<TKeys, string | undefined>
>;
type ValueMap<TKeys extends PropertyKey> = Partial<Record<TKeys, unknown>>;

/**
 * Kiểm tra:
 *  - requiredKeys đều đã "filled" (khác '', null, undefined)
 *  - không có error cho các key bắt buộc
 *  - (tuỳ chọn) extraCheck pass (ví dụ: password === confirmPass)
 * Chatcode chu nay d biet duong code lun
 */
export function useFormValidity<TKeys extends readonly string[]>(
  values: ValueMap<TKeys[number]>,
  errors: ErrMap<TKeys[number]>,
  requiredKeys: TKeys,
  extraCheck?: () => boolean
) {
  const isValid = useMemo(() => {
    const filled = requiredKeys.every((k) => {
      const v = values[k as TKeys[number]];
      return !(v === "" || v === undefined || v === null);
    });

    const hasErr = requiredKeys.some((k: TKeys[number]) => !!errors[k]);

    const extraOk = extraCheck ? extraCheck() : true;

    return filled && !hasErr && extraOk;
  }, [values, errors, requiredKeys, extraCheck]);

  return isValid;
}
