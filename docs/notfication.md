notification.exchange
routing key: email.send
↓
email.main.queue
↓ fail
email.retry.500.exchange
↓
email.retry.500.queue
↓ TTL 500ms
notification.exchange
↓ routing key email.send
email.main.queue
↓ fail again
email.retry.1000.exchange
↓
email.retry.1000.queue
↓ TTL 1000ms
notification.exchange
↓ routing key email.send
email.main.queue
↓ fail again
email.dlx
↓ routing key email.dead
email.dead.queue
