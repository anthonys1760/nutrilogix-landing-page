let current = null

export function captureHead(head) {
  current = head
}

export function consumeHead() {
  const head = current
  current = null
  return head
}
